import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCreateEdit.module.scss';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getEditBlocks,
  getEditImg,
  getEditSubtitle,
  getEditTitle,
} from '@/pages/ArticleEditPage/model/selectors/ArticleEditSelectors';
import { articleEditActions } from '@/pages/ArticleEditPage/model/slice/articleEditSlice';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import {
  ArticleBlock,
  ArticleCodeBlock,
  ArticleImageBlock,
  ArticleTextBlock,
} from '../../model/types/article';
import { Button } from '@/shared/ui/Button';
import { useCallback } from 'react';

export const ArticleCreateEdit = () => {
  const { t } = useTranslation(['article-edit']);
  const title = useSelector(getEditTitle);
  const subtitle = useSelector(getEditSubtitle);
  const image = useSelector(getEditImg);
  const blocks = useSelector(getEditBlocks);
  const dispatch = useAppDispatch();

  const BlockHeader = useCallback(
    (props: { title: string; blockId: string }) => (
      <div className={cls.ArticleEditBlockHeader}>
        <h3 className={cls.ArticleEditBlockName}>{props.title}</h3>
        <Button
          theme="apple-clear"
          onClick={() =>
            dispatch(articleEditActions.removeBlock(props.blockId))
          }
          className={cls.ArticleEditBlockHeaderBtn}>
          <span>{t('Remove')}</span>
        </Button>
      </div>
    ),
    [],
  );

  return (
    <div className={classNames(cls.ArticleCreateEditWrapper, {}, [])}>
      <div className={cls.ArticleCreateEdit}>
        <div className={cls.ArticleEditField}>
          <h3 className={cls.ArticleEditFieldName}>{t('Title')}</h3>
          <TextArea
            placeholder={t('Enter text')}
            value={title}
            onChange={val => dispatch(articleEditActions.setTitle(val))}
          />
        </div>
        <div className={cls.ArticleEditField}>
          <h3 className={cls.ArticleEditFieldName}>{t('Subtitle')}</h3>
          <TextArea
            placeholder={t('Enter text')}
            value={subtitle}
            onChange={val => dispatch(articleEditActions.setSubtitle(val))}
          />
        </div>
        <div className={cls.ArticleEditField}>
          <h3 className={cls.ArticleEditFieldName}>{t('Image')}</h3>
          {image ? (
            <img src={image} alt="main" className={cls.mainImg} />
          ) : (
            <div className={cls.mainImg}></div>
          )}
          <TextArea
            placeholder={t('Enter link')}
            value={image}
            onChange={val => dispatch(articleEditActions.setImg(val))}
          />
        </div>
        <div className={cls.ArticleBlocksWrapper}>
          <h3 className={cls.ArticleEditFieldName}>{t('Blocks')}</h3>
          <div className={cls.ArticleBlocks}>
            {!blocks.length && <p>{t('No blocks have been added yet')}</p>}
            {blocks.map(el => {
              let block: ArticleBlock = el;
              switch (el.type) {
                case ArticleBlockType.TEXT:
                  block = el as ArticleTextBlock;
                  return (
                    <div className={cls.ArticleBlock} key={block.id}>
                      <BlockHeader title={t('Text block')} blockId={block.id} />
                      <div className={cls.ArticleEditField}>
                        <p className={cls.ArticleEditBlockFieldName}>
                          {t('Title')}
                        </p>
                        <TextArea
                          placeholder={t('Enter text')}
                          value={block.title}
                          onChange={val =>
                            dispatch(
                              articleEditActions.setBlockTitle({
                                blockId: block.id,
                                text: val,
                              }),
                            )
                          }
                        />
                      </div>
                      <div className={cls.ArticleEditBlockParagraphs}>
                        {block.paragraphs.map((paragraph, i) => (
                          <div className={cls.ArticleEditField} key={i}>
                            <div className={cls.ArticleEditBlockHeader}>
                              <p className={cls.ArticleEditBlockFieldName}>
                                {t('Paragraph')}
                              </p>
                              <div className={cls.ArticleEditBlockBtns}>
                                <Button
                                  theme="apple-clear"
                                  onClick={() =>
                                    dispatch(
                                      articleEditActions.addTextParagraph({
                                        blockId: block.id,
                                        index: i,
                                      }),
                                    )
                                  }
                                  className={cls.ArticleEditBlockBtn}>
                                  <span>{t('Add')}</span>
                                </Button>
                                {(block as ArticleTextBlock).paragraphs.length >
                                  1 && (
                                  <Button
                                    theme="apple-clear"
                                    onClick={() =>
                                      dispatch(
                                        articleEditActions.removeTextParagraph({
                                          blockId: block.id,
                                          num: i,
                                        }),
                                      )
                                    }
                                    className={cls.ArticleEditBlockBtn}>
                                    <span>{t('Remove')}</span>
                                  </Button>
                                )}
                              </div>
                            </div>
                            <TextArea
                              placeholder={t('Enter text')}
                              value={paragraph}
                              onChange={val =>
                                dispatch(
                                  articleEditActions.setBlockParagraphText({
                                    blockId: block.id,
                                    num: i,
                                    text: val,
                                  }),
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                case ArticleBlockType.IMAGE:
                  block = el as ArticleImageBlock;
                  return (
                    <div className={cls.ArticleBlock} key={block.id}>
                      <BlockHeader
                        title={t('Image block')}
                        blockId={block.id}
                      />
                      <div className={cls.ArticleEditField}>
                        <p className={cls.ArticleEditBlockFieldName}>
                          {t('Title')}
                        </p>
                        <TextArea
                          placeholder={t('Enter text')}
                          value={block.title}
                          onChange={val =>
                            dispatch(
                              articleEditActions.setBlockTitle({
                                blockId: block.id,
                                text: val,
                              }),
                            )
                          }
                        />
                      </div>
                      <div className={cls.ArticleEditField}>
                        <h3 className={cls.ArticleEditBlockFieldName}>
                          {t('Image')}
                        </h3>
                        {block.src ? (
                          <img
                            src={block.src}
                            alt="main"
                            className={cls.mainImg}
                          />
                        ) : (
                          <div className={cls.mainImg}></div>
                        )}
                        <TextArea
                          placeholder={t('Enter link')}
                          value={block.src}
                          onChange={val =>
                            dispatch(
                              articleEditActions.setBlockImgSrc({
                                blockId: block.id,
                                src: val,
                              }),
                            )
                          }
                        />
                      </div>
                    </div>
                  );
                case ArticleBlockType.CODE:
                  block = el as ArticleCodeBlock;
                  return (
                    <div className={cls.ArticleBlock} key={block.id}>
                      <BlockHeader title={t('Code block')} blockId={block.id} />
                      <div className={cls.ArticleEditField}>
                        <p className={cls.ArticleEditBlockFieldName}>
                          {t('Code')}
                        </p>
                        <TextArea
                          placeholder={t('Enter code')}
                          value={block.code}
                          onChange={val =>
                            dispatch(
                              articleEditActions.setBlockCode({
                                blockId: block.id,
                                code: val,
                              }),
                            )
                          }
                        />
                      </div>
                    </div>
                  );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
