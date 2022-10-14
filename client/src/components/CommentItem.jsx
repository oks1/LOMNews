import React from "react";

export const CommentItem = ({comment}) => {
    return (
        <div className="media">
							{/* <div className="media-left">
								<img alt=" " className="media-object" data-src=""
										 src="" data-holder-rendered="true"/> {comment.commentText}
							</div> */}
							<div className="media-body p-5">
								<h4>{comment.authorName}</h4>
							{/* {new Date(comment.dtWhen).toDateString()} */}
								<p className="media-heading">
                                    {comment.commentText}
                                </p>
								<div class="comment_article_social text-muted pl-3 ">
								{new Date(comment.dtWhen).toDateString()}
									</div>
							</div>
        </div> )

        {/* <div>CommentItem</div> */}
}