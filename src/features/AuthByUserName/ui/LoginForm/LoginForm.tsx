import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { InputTheme, TextInput } from 'shared/ui/TextInput/TextInput';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInFormBtnIcon from 'shared/assets/icons/singin-form-btn.svg';
import { useState } from 'react';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const [hideSingInBtn, setHideSingInBtn] = useState(true);
  const [hideUrennameBtn, setHideUrennameBtn] = useState(false);
  const [isUsername, setIsUsername] = useState(false);

  const showPasswordField = () => {
    setIsUsername(true);
    setHideSingInBtn(false);
    setHideUrennameBtn(true);
  };

  const hidePasswordField = () => {
    setIsUsername(false);
    setHideSingInBtn(true);
    setHideUrennameBtn(false);
  };

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <h2 className={cls.title}>{t('Sign in to your account')}</h2>
      <div className={cls.form}>
        <TextInput
          fieldTitle={t('Username')}
          theme={isUsername ? InputTheme.WITHOUT_BOTTOM_CORNERS : undefined}
          onInput={hidePasswordField}
        />
        <Button
          theme={ButtonTheme.CLEAR}
          className={classNames(cls.SingInBtn, {}, [
            cls.UserNameBtn,
            hideUrennameBtn ? cls.hidden : undefined,
          ])}
          onClick={showPasswordField}
        >
          <SingInFormBtnIcon className={cls.btnIcon} />
        </Button>
        <TextInput
          fieldTitle={t('Password')}
          theme={InputTheme.WITHOUT_TOP_CORNERS}
          hidden={!isUsername}
        />
        <Button
          theme={ButtonTheme.CLEAR}
          className={classNames(cls.SingInBtn, {}, [
            cls.PasswordBtn,
            hideSingInBtn ? cls.hidden : undefined,
          ])}
        >
          <SingInFormBtnIcon className={cls.btnIcon} />
        </Button>
      </div>
    </div>
  );
};
