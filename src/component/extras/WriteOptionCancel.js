import React, {Component} from 'react';
import "./_extra.scss"

export default class WriteOptionCancel extends Component {

    handleDeleteOption = () => {
        this.props.deleteBlogOption(this.props.optionIndex)
    }

    render() {
        return (
            <div style={{paddingTop: "1%"}}>
                <button className="option-cancel__button"><p className="option-cancel__size" onClick={this.handleDeleteOption}>&#10005;</p></button>
            </div>
        )
    }
}