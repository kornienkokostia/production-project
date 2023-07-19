import { ChangeEvent, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import SendCommentFormBtnIcon from '@/shared/assets/icons/send.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

interface addCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

export const AddCommentForm = memo(
  ({ className, onSendComment }: addCommentFormProps) => {
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article-details');

    const onCommentTextChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.currentTarget;
        el.style.height = '56px';
        el.style.height = `${el.scrollHeight}px`;
        dispatch(addCommentFormActions.setText(el.value));
      },
      [dispatch],
    );

    const onSendHandler = useCallback(() => {
      onSendComment(text || '');
      dispatch(addCommentFormActions.setText(''));
      const el = document.querySelector(
        `.${cls.commentMsg}`,
      ) as HTMLTextAreaElement;
      el.style.height = '56px';
    }, [onSendComment, text, dispatch]);

    return (
      <DynamicModuleLoader reducers={reducers}>
        <div className={classNames(cls.addCommentForm, {}, [className])}>
          <textarea
            className={cls.commentMsg}
            placeholder={t('Add a comment')}
            onChange={e => onCommentTextChange(e)}
            value={text}
          />
          <Button
            theme={ButtonTheme.CLEAR}
            className={cls.sendCommentBtn}
            onClick={onSendHandler}
            disabled={!text}
          >
            <SendCommentFormBtnIcon className={cls.btnIcon} />
          </Button>
        </div>
      </DynamicModuleLoader>
    );
  },
);
