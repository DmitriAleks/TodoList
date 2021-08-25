import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError =(dispatch: Dispatch<ErrorUtilsACType>, message:string)=>{
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}
export const handleServerAppError =<T>(dispatch: Dispatch<ErrorUtilsACType>, data:ResponseType<T>)=>{
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Неизвестная ошибка, свяжитесь с администрацией'))
        dispatch(setAppStatusAC('failed'))
    }
}
export type ErrorUtilsACType =
    | SetAppStatusType
    | SetAppErrorACType