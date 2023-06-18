import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { InputTheme, TextInput } from 'shared/ui/TextInput/TextInput';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInFormBtnIcon from 'shared/assets/icons/singin-form-btn.svg';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from 'features/AuthByUserName/model/selectors/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { loginByUsername } from 'features/AuthByUserName/model/services/LoginByUsername/loginByUsername';
import { Loader, LoaderTheme } from 'shared/ui/Loader/Loader';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const [hideSingInBtn, setHideSingInBtn] = useState(true);
  const [hideUsernameBtn, setHideUsernameBtn] = useState(false);
  const [passwordFieldVisible, setPasswordFieldVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    username,
    usernameFocused,
    password,
    passwordFocused,
    error,
    isLoading,
  } = useSelector(getLoginState);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const showPasswordField = () => {
    setPasswordFieldVisible(true);
    setHideSingInBtn(false);
    setHideUsernameBtn(true);
    setTimeout(() => {
      const el = document.querySelectorAll(
        '.input-field-input',
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
  const onSigninBtnClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

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
    [showPasswordField],
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
        .querySelectorAll<HTMLInputElement>('.input-field-input')[0]
        .focus();
      setShowErrorMsg(true);
    }
  }, [error, dispatch]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <h2 className={cls.title}>{t('Sign in to your account')}</h2>
      <div className={cls.form}>
        <TextInput
          fieldTitle={t('Username')}
          isFocused={usernameFocused}
          setIsFocused={changeUsernameFocused}
          theme={
            passwordFieldVisible ? InputTheme.WITHOUT_BOTTOM_CORNERS : undefined
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
            <div className={cls.Triangle}></div>
            <span>{t('UsernameSignInError')}</span>
          </div>
        )}
      </div>
    </div>
  );
});
