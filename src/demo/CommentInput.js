import React from 'react'

export class CommentInput extends React.Component {

    render() {
        return <div className='comment-input'>
            <div className='comment-field'>
                <span className='comment-field-name'>用户名：</span>
                <div className='comment-field-input'>
                    <input/>
                </div>
            </div>
            <div className='comment-field'>
                <span className='comment-field-name'>评论内容：</span>
                <div className='comment-field-input'>
                    <textarea/>
                </div>
            </div>
            <div className='comment-field-button'>
                <button>
                    发布
                </button>
            </div>
        </div>
    }

}
