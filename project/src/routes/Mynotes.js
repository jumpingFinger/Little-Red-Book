import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";

import RedactDraft from "./myNotes/RedactDraft";
import RedactNote from "./myNotes/RedactNote";

class Mynotes extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        return <section >
            <Switch>
                <Route path={'/myNotes'} exact component={RedactNote}/>
                <Route path={'/myNotes/redactDraft/:draftId'}  component={RedactDraft}/>
                <Redirect to="/myNotes"/>
            </Switch>
        </section>
    }
}
export default Mynotes