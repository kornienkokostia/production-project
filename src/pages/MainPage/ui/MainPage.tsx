import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

function MainPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h3>Accounts:</h3>
      <br />
      <p>username: user</p>
      <p>password: 123</p>
      <br />
      <p>username: admin</p>
      <p>password: 123</p>
    </div>
  );
}

export default MainPage;
