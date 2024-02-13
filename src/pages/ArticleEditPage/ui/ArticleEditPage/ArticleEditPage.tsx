import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { memo, useEffect } from 'react';
import { appStateActions } from '@/entities/AppState';
import { ArticleEditPageHeader } from '../ArticleEditPageHeader/ArticleEditPageHeader';
import { ArticleCreateEdit } from '@/entities/Article/ui/ArticleCreateEdit/ArticleCreateEdit';
import { useSelector } from 'react-redux';
import { getEditArticleData } from '../../model/selectors/ArticleEditSelectors';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appStateActions.setContentLoaded(true));
  }, [dispatch]);
  const title = useSelector(getEditArticleData);

  useEffect(() => {
    console.log(title);
  }, [title]);

  return (
    <div className={classNames(cls.ArticleEditPage, {}, [className])}>
      <ArticleEditPageHeader isEdit={isEdit} />
      <div className={classNames(cls.ArticleEditPageContent, {}, [className])}>
        <ArticleCreateEdit />
      </div>
    </div>
  );
});

export default ArticleEditPage;
