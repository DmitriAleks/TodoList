import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state,action:PayloadAction<{error: string | null}>){
          state.error = action.payload.error
        },
        setAppStatusAC(state,action:PayloadAction<{status: RequestStatusType}>){
           state.status = action.payload.status
        },
        setIsInitializedAC(state,action:PayloadAction<{isInitialized: boolean}>){
           state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer;
export const {setAppErrorAC,setAppStatusAC,setIsInitializedAC} = slice.actions;

//     (
// }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedACActionType = ReturnType<typeof setIsInitializedAC>


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}));

        } else {
            handleServerAppError(res.data, dispatch);
        }
    }).catch()
        .finally(() => {
                dispatch(setIsInitializedAC({isInitialized: true}));
            }
        )
}

