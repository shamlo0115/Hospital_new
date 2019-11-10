import axios from 'axios';
import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '@store/actions-helpers';

export const START_FETCHING_ITEMS = '[APP] START_FETCHING_ITEMS';
export const FINISH_FETCHING_ITEMS = '[APP] FINISH_FETCHING_ITEMS';
export const START_FETCHING_VIDEO_URL = '[APP] START_FETCHING_VIDEO_URL';
export const FINISH_FETCHING_VIDEO_URL = '[APP] FINISH_FETCHING_VIDEO_URL';

export const Actions = {
    startFetching: () => createAction(START_FETCHING_ITEMS),
    finishFetching: (items: any) => createAction(FINISH_FETCHING_ITEMS, items),
    startFetchingVideoUrl: (videoId: string) => createAction(START_FETCHING_VIDEO_URL),
    finishFetchingUrl: (embedVideoUrl: string) => createAction(FINISH_FETCHING_VIDEO_URL, embedVideoUrl),
};

export const Thunks = {
    getItemsAction: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetching());
            const hostname = window.location.hostname;
            const promise = axios.get('http://' + hostname + ':9090/api/indexer');
            promise.then(
                (response: any) => {
                    console.log('response', response.data);
                    const data = response.data.map(
                        object => {
                            console.log('Object', object);
                            return ({
                                id: object.id,
                                embedUrl: object.embedVideoUrl,
                                title: object.name,
                                storageId: object.storageId,
                                image: {
                                    url: object.thumbnailUrl,
                                },
                            });
                        }
                    );
                    console.log('data', data);
                    dispatch(Actions.finishFetching(data));
                }
            );
        };
    },

};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
