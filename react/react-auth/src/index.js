import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { LayoutHocView } from './components/Layout/Hoc';
// import { LayoutPathView } from './components/Layout/Path';
import reportWebVitals from './reportWebVitals';
import './index.css';

// 高阶组件控制权限
ReactDOM.render(<Router><LayoutHocView /></Router>, document.getElementById('root'));
// 根据路由控制权限
// ReactDOM.render(<Router><LayoutPathView /></Router>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
