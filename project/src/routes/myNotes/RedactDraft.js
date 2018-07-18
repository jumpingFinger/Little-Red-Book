import React from 'react';
import {connect} from 'react-redux';
import Header from "../../component/Header";
import {Icon, Input, Modal, Upload, Button} from "antd";
import "../../static/css/plus.less";
import action from "../../store/action";

class RedactDraft extends React.Component {
    constructor(props, context) {
        super(props, context);
        let _default = {
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {match: {params: {draftId}}, draftInfo} = this.props,
            fileList = [];
        draftInfo = draftInfo.find(item => parseFloat(item.draftId) === parseFloat(draftId));
        let {content, nodeImg} = draftInfo;
        nodeImg.forEach((url, index) => {
            fileList.push({..._default, url, uid: index - 1})
        });
        this.state = {
            previewVisible: false,
            previewImage: '',
            value: '',
            fileList,
            content,
            draftId
        };
    }

    handleCancel = () => this.setState({previewVisible: false});
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    handleChange = (obj) => {
        let {fileList} = obj;
        return this.setState({fileList})
    };
    handleContentChange = (ev) => {
        let value = ev.target.value;
        this.setState({value});
    };
    computedInfo =(type) => {
        let {fileList, value} = this.state;
        let imgUrl = [];
        fileList.forEach((item) => {
            if (!item.url) {
                imgUrl.push(item.response.showUrl);
                return;
            }
            if (item.url === "undefined") return;
            imgUrl.push(item.url);
        });
        imgUrl = JSON.stringify(imgUrl);//=>不要忘记了
        if(type==="add"){
            return {
                content: value,
                nodeImg: imgUrl
            }
        }
        return {
            draftId: this.state.draftId,
            content: value,
            nodeImg: imgUrl
        }
    };

    async reviseNode() {
        let nodeInfo = this.computedInfo();
        await this.props.reviseDratFun(nodeInfo);
        this.props.history.goBack();
    };
    async addNode (){
        let nodeInfo=this.computedInfo('add');
        let time=new Date().getTime();
        this.props.updateHome(time);
        await this.props.addNode(nodeInfo);
        await this.props.getAttentionInfo();
        this.props.history.goBack();
    };

    confirm = () => {
        Modal.confirm({
            title: '提示',
            content: '是否修改草稿',
            okText: '确认',
            cancelText: '取消',
            onCancel: this.onCancel,
            onOk: this.reviseNode.bind(this)
        });
    };

    // async onOk() {
    //     console.log(1);
    //     let nodeInfo = this.computedInfo();
    //     console.log(333333);
    //     await this.props.reviseNode(nodeInfo);
    //     console.log(4444);
    //     this.props.history.goBack();
    // };

    onCancel = () => {
        this.props.history.goBack();
    };

    render() {
        const {TextArea} = Input;
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return <section className={"plusBox"}>
            <Header>
                <div className={'cancel'} onClick={(ev) => {
                    ev.preventDefault();
                    this.confirm()
                }}>
                    <span>取消</span>
                </div>
                <h3 className={'title'}><span>发布笔记</span></h3>
                <div className={'done'}
                     style={{
                         color: "#D6D6D6",
                         fontSize: '16px'
                     }} onClick={this.reviseNode.bind(this)}>存草稿
                </div>
            </Header>
            <div className={'plusContainer'}>
                <TextArea
                    rows={7}
                    defaultValue={this.state.content}
                    onChange={this.handleContentChange}
                    maxLength="150" ref={'aa'}
                    size={'large'}
                    style={{
                        fontSize: "16px",
                        lineHeight: ".6rem",
                        height: "4.2rem"
                    }}
                />
                <div className="addImage">
                    <div className={'container'}>
                        <Upload
                            action="http://localhost:8000/person/addImage"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{width: '100%'}} src={previewImage}/>
                        </Modal>
                    </div>
                </div>
                <div className={'location'}>
                    <Icon type="environment-o"/>
                    添加地点
                </div>
            </div>
            <div className={'postPlus'} onClick={this.addNode.bind(this)}>
                <span>发布</span><Icon type="arrow-right"/>
            </div>
        </section>
    }
}

export default connect(state => ({...state.person}), action.person)(RedactDraft);