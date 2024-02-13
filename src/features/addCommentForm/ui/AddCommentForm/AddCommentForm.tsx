import {
  ChangeEvent,
  MutableRefObject,
  memo,
  useCallback,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import SendCommentFormBtnIcon from '@/shared/assets/icons/send.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import { TextArea } from '@/shared/ui/TextArea/TextArea';

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
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article-details');
    const commentRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

    const onCommentTextChange = useCallback(
      (val: string) => {
        dispatch(addCommentFormActions.setText(val));
      },
      [dispatch],
    );

    const onSendHandler = useCallback(() => {
      onSendComment(text || '');
      dispatch(addCommentFormActions.setText(''));
      commentRef.current.style.height = '56px';
    }, [onSendComment, text, dispatch]);

    return (
      <DynamicModuleLoader reducers={reducers}>
        <div className={classNames(cls.addCommentForm, {}, [className])}>
          <TextArea
            placeholder={t('Add a comment')}
            value={text}
            onChange={val => onCommentTextChange(val)}
            ref={commentRef}
          />
          <Button
            theme="clear"
            className={cls.sendCommentBtn}
            onClick={onSendHandler}
            disabled={!text}>
            <SendCommentFormBtnIcon className={cls.btnIcon} />
          </Button>
        </div>
      </DynamicModuleLoader>
    );
  },
);
