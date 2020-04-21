import React from 'react';
const postModal = (props) => {
    return (
        <div className="modal show" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Post Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.clicked}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p><b>Title:</b> {props.post.title}</p>
                        <p><b>URL:</b> {props.post.url}</p>
                        <p><b>Author:</b> {props.post._tags.toString()}</p>
                        <p><b>Created At:</b> {new Date(props.post.created_at).toLocaleDateString('en-GB')}</p>
                        
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={props.clicked}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default postModal;