import React from 'react';
import {connect} from 'react-redux';
import {Icon, Modal} from "antd";
import Header from "../component/Header";
import "../static/css/myDraft.less";
import action from "../store/action/index";

class MyDraft extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // isQueryDraftList: this.props.isQueryDraftList
            isRegulate: false,
            removeDraft: []
        }
    }

    //=>判断什么时候发请求,什么时候从redux里面取(判断redux个人信息里面草稿序号和保存在redux里面的草稿详细信息比较)
    async componentDidMount() {
        let {queryDraft, isQueryDraftListFun, isQueryDraftList} = this.props;
        //   console.log(isQueryDraftList,111111111);
        //  if (isQueryDraftList) {
        await queryDraft();
        //  isQueryDraftListFun(false);
        //  }
    }

    // async componentWillReceiveProps(){
    // let {queryDraft,isQueryDraftListFun,isQueryDraftList}=this.props;
    // if (isQueryDraftList) {
    //     await queryDraft();
    //     isQueryDraftListFun(false)
    // }
    //  console.log("触发receive");
    // }

    isNeedLoad = () => {
        let {draftInfo, personInfo} = this.props;
        let match = personInfo.draft.every(draftId => {
            return draftInfo.find(item => item.draftId === draftId);
        });
        return !match
    };

    handleChange = (ev) => {
        let ary =this.state.removeDraft;
        let target = ev.target;
        if (target.classList.contains("icon")) {
            target = target.parentNode
        }
        if (target.classList.contains("button")) {
            if (target.classList.contains("active")) {
                target.classList.remove("active");
                ary=this.state.removeDraft;
                ary=ary.filter(item=>item !== parseFloat(target.dataset.value));
                this.setState({removeDraft: ary});
                return;
            }
            target.classList.add("active");
            ary.push(parseFloat(target.dataset.value));
            this.setState({
                removeDraft: ary
            });
        }
    };

    confirm = () => {
        Modal.confirm({
            title: '您还没有完成管理操作',
            content: '是否要退出?',
            okText: '确认',
            cancelText: '取消',
            onCancel: this.onCancel.bind(this),
            onOk: this.onOk.bind(this),
            width: 200,
            closable: false,
            style: {
                top: '4rem'
            },
            zIndex: 5000
        });
    };

    async onOk() {
        this.props.history.goBack();
    };

    onCancel = () => {

    };

    //=>双新两次就没了,是不是需要redux来管控??????
    render() {
        let {draftInfo, isQueryDraftListFun, removeDraftFun} = this.props;
        let isNeedLoad = this.isNeedLoad();
        if (isNeedLoad) {
            //    isQueryDraftListFun(isNeedLoad);
            return ''
        }

        return <section className={'myDraftBox'}>
            <Header>
                <Icon type="left" className={'icon'} onClick={(ev) => {
                    ev.preventDefault();
                    this.state.isRegulate ? this.confirm() : this.props.history.goBack();
                }}/>
                <h3 className={'title'}><span>我的草稿</span></h3>
                <div className={'done'}
                     style={{
                         color: this.state.isRegulate ? "red" : "#D6D6D6",
                         fontSize: '16px'
                     }}
                     onClick={() => {
                         this.setState({isRegulate: !this.state.isRegulate})
                     }}>{this.state.isRegulate ? "完成" : "管理"}</div>
            </Header>
            <div className={'containerBox'} onClick={this.handleChange}>
                <ul>
                    {
                        draftInfo.map((item, index) => {
                            let {content, time, nodeImg, draftId} = item;
                            return (<li key={index} onClick={(ev) => {
                                ev.preventDefault();
                                if (!this.state.isRegulate) {
                                    this.props.history.push(`/myNotes/redactDraft/${draftId}`);
                                }
                            }}>
                                <div className={'left'}>
                                    <img
                                        src={nodeImg[0]}
                                        alt=""/>
                                    <div className={"button"} style={{
                                        display: this.state.isRegulate ? "block" : "none"
                                    }} data-value={draftId} ref={"button"}>
                                        <Icon type="check-circle-o" className={"icon"}/>
                                    </div>
                                </div>
                                <div className={'right'}>
                                    <p>{content}</p>
                                    <div className={"time"}>{time}</div>
                                </div>
                            </li>)
                        })
                    }
                </ul>
            </div>
            <div className={"footer"} style={{
                display: this.state.isRegulate ? "block" : "none"
            }} onClick={(ev) => {
                let target = ev.target,
                    tarName = target.tagName;
                if (tarName === "SPAN") {
                    target = target.parentNode;
                    tarName = target.tagName;
                }
                if (target && tarName === "DIV" && target.classList.contains('footer')) {
                    let removeDraft = JSON.stringify(this.state.removeDraft);
                    removeDraftFun({
                        removeDraft
                    })
                }
            }}>
                <p>已选了{this.state.removeDraft.length}个草稿</p>
                <span>删除</span>
            </div>
        </section>
    }
}

export default connect(state => ({...state.more, ...state.person}), {...action.more, ...action.person})(MyDraft);