import React, {Component} from 'react';
import WriteOptionCancel from '../../extras/WriteOptionCancel';
import { Editor } from 'react-draft-wysiwyg';
import {convertToRaw} from 'draft-js'
// import draftToHtml from 'draftjs-to-html';
// import convert from 'htmr';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './_contentwrite.scss'

export default class ContentWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: "",
            contentInput: ""
        }
    }

    handleContentWrite = (editorState) => {
        this.setState({
            editorState
        })
    }

    render() {
        return (
            <div className="contentwrite-padding">
                <div className="row">
                    <div className="col">
                        <Editor id="content" className="form-control"
                            editorClassName="editor-content__draft"
                            editorState={this.state.editorState}
                            placeholder="type here..."
                            onEditorStateChange={(event) => this.handleContentWrite(event)} 
                            required />
                    </div>
                    <div className="col">
                        <WriteOptionCancel {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}