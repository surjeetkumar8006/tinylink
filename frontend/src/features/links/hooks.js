
// src/features/links/hooks.js
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../app/store';
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
