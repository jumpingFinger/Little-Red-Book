import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "../static/css/sexSelect.less";
import {Icon} from "antd";
import Transition from 'react-transition-group/Transition';
import action from "../store/action";

const duration = 300;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    display: 'none'
};
const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
};

class SexSelect extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            sex: 0,
            isLoad: false,
            isLoading: false
        };
        console.log(this.props);
    }

    componentDidUpdate() {
        if (this.props.isSexShow && !this.state.isLoad) {
            this.setState({
                isLoad: true
            });
            let scroll = this.refs.transition.refs.sexSelect,
                top = scroll.offsetTop,
                change = 0,
                start = 0,
                preChange = 0;
            let move = (ev) => {
                //=>先确定运动的方向=>>需要一个标记
                //向上移是负数   向下移动时正的
                top = scroll.offsetTop;
                let current = ev.touches[0].pageY;
                //  direction= current - start<0?-1:1;
                change = (current - start) / 2;
                if (change < 40 && change > -60) {
                    scroll.style.top = (change - preChange) + top + 'px';
                }
                preChange = change;
            };
            let end = (ev) => {
                if (top > 9) {
                    //=>男性边界
                    scroll.style.top = 25 + 'px';
                    this.setState({
                        sex: 0
                    })
                } else {
                    scroll.style.top = -25 + 'px';
                    this.setState({
                        sex: 1
                    })
                }
                scroll.removeEventListener('touchmove', move);
                scroll.removeEventListener('touchend', end);
            };
            scroll.addEventListener('touchstart', (ev) => {
                start = ev.touches[0].pageY;
                scroll.addEventListener('touchmove', move);
                scroll.addEventListener('touchend', end);
            }, false);
        }
    }

    changeShow = () => {
        this.props.changeSexSHow();
    };

    async changeSexInfo() {
        if (this.state.isLoading) return;
        this.setState({isLoading: true});
        let data = await this.props.reviseBaseInfo({
            type: "sex",
            value: this.state.sex
        });
        this.setState({isLoading: false});
        this.props.changeSexSHow();
    };

    render() {
        return <div>
            <Transition in={this.props.isSexShow} timeout={duration} onEnter={(node) => {
                node.style.display = 'block'
            }} onExit={(node) => {
                node.style.display = 'none'
            }} ref={'transition'}>
                {
                    (state) => (
                        <div className={'sexSelectBox'} style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            <div className={'header'}>
                                <span className={'left'} onClick={this.changeShow}>取消</span>
                                <span className={'right'} onClick={this.changeSexInfo.bind(this)}>确认</span>
                            </div>
                            <div className={'select'}>
                                <div className={'border'}/>
                                <div className={'sexSelect'}>
                                    <div className={'container'} ref={'sexSelect'}>
                                        <span/>
                                        <span className={this.state.sex === 0 ? "active" : ''}>男性</span>
                                        <span className={this.state.sex === 1 ? "active" : ''}>女性</span>
                                        <span/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Transition>
        </div>

    }
}

export default connect(state => ({...state.person}), {...action.person})(SexSelect);
