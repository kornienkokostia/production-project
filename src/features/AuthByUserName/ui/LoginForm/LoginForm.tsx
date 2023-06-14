import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { InputTheme, TextInput } from 'shared/ui/TextInput/TextInput';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInFormBtnIcon from 'shared/assets/icons/singin-form-btn.svg';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <h2 className={cls.title}>Sign in to your account</h2>
      <div className={cls.form}>
        <TextInput
          fieldTitle="Username"
          theme={InputTheme.WITHOUT_BOTTOM_CORNERS}
        />
        <TextInput
          fieldTitle="Password"
          theme={InputTheme.WITHOUT_TOP_CORNERS}
        />
        <Button theme={ButtonTheme.CLEAR} className={cls.SingInFromBtn}>
          <SingInFormBtnIcon className={cls.btnIcon} />
        </Button>
      </div>
    </div>
  );
};
