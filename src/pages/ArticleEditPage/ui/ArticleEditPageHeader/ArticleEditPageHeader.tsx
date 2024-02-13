import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPageHeader.module.scss';
import { useSelector } from 'react-redux';
import { getNavbarCollapsed } from '@/entities/AppState';
import { ArticleCategorySelector } from '@/features/ArticleCategorySelector';
import { getEditType } from '../../model/selectors/ArticleEditSelectors';
import { memo, useCallback } from 'react';
import { ArticleType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articleEditActions } from '../../model/slice/articleEditSlice';
import { Button } from '@/shared/ui/Button';
import { getRouteArticles } from '@/shared/const/router';
import ArrowBackIcon from '@/shared/assets/icons/arrow-back.svg';
import { useNavigate } from 'react-router-dom';
import { ArticleAddBlockSelector } from '@/features/ArticleAddBlockSelector';
import { ArticleBlockType } from '@/entities/Article/model/consts/articleConsts';
import { addNewArticle } from '../../model/services/addNewArticle';

interface ArticleEditPageHeaderProps {
  className?: string;
  isEdit: boolean;
}

export const ArticleEditPageHeader = memo(
  ({ className, isEdit }: ArticleEditPageHeaderProps) => {
    const { t } = useTranslation(['article-edit']);
    const navbarCollapsed = useSelector(getNavbarCollapsed);
    const category = useSelector(getEditType);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChangeCategory = useCallback(
      (type: ArticleType) => {
        dispatch(articleEditActions.setType(type));
      },
      [dispatch],
    );
    const onAddBlock = useCallback(
      (block: ArticleBlockType) => {
        dispatch(articleEditActions.addBlock(block));
      },
      [dispatch],
    );
    const onSaveArticleClick = useCallback(() => {
      dispatch(addNewArticle());
      navigate(getRouteArticles());
    }, [navigate, getRouteArticles]);

    return (
      <>
        <div
          className={classNames(
            cls.ArticleEditPageHeader,
            { [cls.navbarCollapsed]: navbarCollapsed },
            [],
          )}>
          <Button
            theme="apple-clear"
            onClick={() => navigate(getRouteArticles())}>
            <ArrowBackIcon className={cls.btnIcon} />
            <span>{t('Back')}</span>
          </Button>
          <h2 className={cls.title}>
            {t(isEdit ? 'Article editing' : 'Article creation')}
          </h2>
          <Button
            theme="apple-clear"
            className={cls.createBtn}
            onClick={onSaveArticleClick}>
            <span>{t('Create')}</span>
          </Button>
        </div>
        <div className={classNames(cls.ArticleEditSubheader, {}, [className])}>
          <ArticleCategorySelector
            value={category[0]}
            onChange={onChangeCategory}
            sidebarPadding={!navbarCollapsed}
            withoutAll={true}
          />
          <ArticleAddBlockSelector
            value={ArticleBlockType.TEXT}
            onChange={onAddBlock}
          />
        </div>
      </>
    );
  },
);
