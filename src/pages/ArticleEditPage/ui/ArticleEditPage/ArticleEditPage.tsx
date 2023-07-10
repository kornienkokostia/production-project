import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <div className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit ? 'Article Edit Page' : 'Article Create Page'}
    </div>
  );
};

export default ArticleEditPage;
