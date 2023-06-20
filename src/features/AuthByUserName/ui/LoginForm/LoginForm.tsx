import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { InputTheme, TextInput } from 'shared/ui/TextInput/TextInput';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInFormBtnIcon from 'shared/assets/icons/singin-form-btn.svg';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader, LoaderTheme } from 'shared/ui/Loader/Loader';
import cls from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/LoginByUsername/loginByUsername';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getUsernameFocused } from '../../model/selectors/getUsernameFocused/getUsernameFocused';
import { getPasswordFocused } from '../../model/selectors/getPasswordFocused/getPasswordFocused';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const [hideSingInBtn, setHideSingInBtn] = useState(true);
  const [hideUsernameBtn, setHideUsernameBtn] = useState(false);
  const [passwordFieldVisible, setPasswordFieldVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);
  const usernameFocused = useSelector(getUsernameFocused);
  const passwordFocused = useSelector(getPasswordFocused);

  const showPasswordField = () => {
    setPasswordFieldVisible(true);
    setHideSingInBtn(false);
    setHideUsernameBtn(true);
    setTimeout(() => {
      const el = document.querySelectorAll(
        `.${cls.LoginForm} .input-field-input`,
      )[1] as HTMLInputElement;
      el.focus();
    }, 200);
  };

  const hidePasswordField = () => {
    setPasswordFieldVisible(false);
    setHideSingInBtn(true);
    setHideUsernameBtn(false);
  };

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
      setShowErrorMsg(false);
      if (!error) {
        hidePasswordField();
        dispatch(loginActions.setPassword(''));
        dispatch(loginActions.setPasswordFocused(false));
      }
    },
    [dispatch, error],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
      setShowErrorMsg(false);
    },
    [dispatch],
  );

  const changeUsernameFocused = useCallback(
    (value: boolean) => {
      dispatch(loginActions.setUsernameFocused(value));
    },
    [dispatch],
  );

  const changePasswordFocused = useCallback(
    (value: boolean) => {
      dispatch(loginActions.setPasswordFocused(value));
    },
    [dispatch],
  );
  const onSigninBtnClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, username, password, onSuccess]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (username && !password) {
          showPasswordField();
        }
        if (username && password) {
          onSigninBtnClick();
        }
      }
    },
    [showPasswordField, onSigninBtnClick, password, username],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    if (error) {
      dispatch(loginActions.setPassword(''));
      dispatch(loginActions.setPasswordFocused(false));
      document
        .querySelectorAll<HTMLInputElement>(
          `.${cls.LoginForm} .input-field-input`,
        )[0]
        .focus();
      setShowErrorMsg(true);
    }
  }, [error, dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <h2 className={cls.title}>{t('Sign in to your account')}</h2>
        <div className={cls.form}>
          <TextInput
            fieldTitle={t('Username')}
            isFocused={usernameFocused}
            setIsFocused={changeUsernameFocused}
            theme={
              passwordFieldVisible
                ? InputTheme.WITHOUT_BOTTOM_CORNERS
                : undefined
            }
            paddingRight={!passwordFieldVisible}
            onChange={onChangeUsername}
            value={username}
          />
          <Button
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.SingInBtn, {}, [
              cls.UserNameBtn,
              hideUsernameBtn ? cls.hidden : undefined,
            ])}
            onClick={showPasswordField}
            disabled={username.length === 0}
          >
            <SingInFormBtnIcon className={cls.btnIcon} />
          </Button>
          <TextInput
            fieldTitle={t('Password')}
            isFocused={passwordFocused}
            setIsFocused={changePasswordFocused}
            theme={InputTheme.WITHOUT_TOP_CORNERS}
            paddingRight={passwordFieldVisible}
            hidden={!passwordFieldVisible}
            onChange={onChangePassword}
            value={password}
            type="password"
          />
          <Button
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.SingInBtn, {}, [
              cls.PasswordBtn,
              hideSingInBtn ? cls.hidden : undefined,
            ])}
            disabled={password.length === 0 || isLoading}
            onClick={onSigninBtnClick}
          >
            {isLoading ? (
              <Loader theme={LoaderTheme.SMALL} />
            ) : (
              <SingInFormBtnIcon className={cls.btnIcon} />
            )}
          </Button>
          {showErrorMsg && (
            <div className={cls.ErrorPopup}>
              <div className={cls.Triangle} />
              <span>{t('UsernameSignInError')}</span>
            </div>
          )}
        </div>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
