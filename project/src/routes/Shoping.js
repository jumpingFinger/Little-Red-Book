import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect,Link} from "react-router-dom";
import '../static/css/shopping.less';
import ShopDetail from './shopping/shoppingDetail';
import ShoppingHome from './shopping/shopingHome';
import '../static/css/common.less';

class Shopping extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        return <section className={'shoppingBox'}>
            <Switch>
                <Route path={"/shopping"} exact component={ShoppingHome}/>
                <Route path={"/shopping/detail"} component={ShopDetail}/>
            </Switch>
        </section>
    }
}
export default Shopping;