import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ArticleEditSchema } from '../types/ArticleEditSchema';
import { ArticleType } from '@/entities/Article';
import { ArticleBlockType } from '@/entities/Article/model/consts/articleConsts';
import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from '@/entities/Article/model/types/article';


const initialState: ArticleEditSchema = {
  title: '',
  subtitle: '',
  img: '',
  type: [ArticleType.MOBILE_DEV],
  blocks: [],
};

export const articleEditSlice = createSlice({
  name: 'articleEdit',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSubtitle: (state, action: PayloadAction<string>) => {
      state.subtitle = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = []
      state.type.push(action.payload);
    },
    addBlock: (state, action: PayloadAction<ArticleBlockType>) => {
      const lastEl = state.blocks.slice(-1)[0]
      const id = `${lastEl?.id ? +lastEl.id + 1 : 0}`
      switch (action.payload) {
        case ArticleBlockType.TEXT:
          state.blocks.push({
            id: id,
            type: ArticleBlockType.TEXT,
            title: "",
            paragraphs: [""],
          } as ArticleTextBlock)
          break
        case ArticleBlockType.IMAGE:
          state.blocks.push({
            id: id,
            type: ArticleBlockType.IMAGE,
            src: "",
            title: "",
          } as ArticleImageBlock)
          break
        case ArticleBlockType.CODE:
          state.blocks.push({
            id: id,
            type: ArticleBlockType.CODE,
            code: ""
          } as ArticleCodeBlock)
          break
      }
    },
    setBlockTitle: (state, action: PayloadAction<{ blockId: string, text: string }>) => {
      const { blockId, text } = action.payload
      const block = state.blocks.find(el => el.id === blockId) as ArticleTextBlock | ArticleImageBlock
      block.title = text
    },
    setBlockParagraphText: (state, action: PayloadAction<{ blockId: string, num: number, text: string }>) => {
      const { blockId, num, text } = action.payload
      const block = state.blocks.find(el => el.id === blockId) as ArticleTextBlock
      block.paragraphs[num] = text
    },
    setBlockImgSrc: (state, action: PayloadAction<{ blockId: string, src: string }>) => {
      const { blockId, src } = action.payload
      const block = state.blocks.find(el => el.id === blockId) as ArticleImageBlock
      block.src = src
    },
    setBlockCode: (state, action: PayloadAction<{ blockId: string, code: string }>) => {
      const { blockId, code } = action.payload
      const block = state.blocks.find(el => el.id === blockId) as ArticleCodeBlock
      block.code = code
    },
    addTextParagraph: (state, action: PayloadAction<{ blockId: string, index: number }>) => {
      const { blockId, index } = action.payload
      const block = state.blocks.find(el => el.id === blockId) as ArticleTextBlock
      console.log(index)
      block.paragraphs.splice(index + 1, 0, '')
    },
    removeTextParagraph: (state, action: PayloadAction<{ blockId: string, num: number }>) => {
      const { blockId, num } = action.payload
      const block = state.blocks.find(el => el.id === blockId) as ArticleTextBlock
      block.paragraphs.splice(num, 1)
    },
    removeBlock: (state, action: PayloadAction<string>) => {
      state.blocks = state.blocks.filter(el => el.id !== action.payload)
    },
    resetFileds: (state) => {
      state.title = '';
      state.subtitle = '';
      state.img = '';
      state.type = [ArticleType.MOBILE_DEV];
      state.blocks = [];
    }
  },

});

export const { actions: articleEditActions, reducer: articleEditReducer } = articleEditSlice;
