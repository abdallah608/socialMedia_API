
# socialMedia_API

https://socialmediaapi-oj5g.onrender.com

handle user routers :

/user/signup (POST)  ==>{path-name-email-password-confirmPassword-age-mobileNumber}

/user /verify/:token  (GET) 

/user /signIn (POST) ===>{email-password}

/user/addCoverPic  (POST) ==> {path,_id,token}

/user /update  (PUT) ==> {_id,mobileNumber,name , token}

/user/updateProfilePic (PUT) ==> {path,_id,token}

/user/updateCoverPic (PUT) ==> {path,_id,token}

/user /delete  (Delete) ==>{_id,token}

/user /softDeleted  (Delete)==>{_id,token}

/user /changePassword (PUT) ==> {email-password,token}

/user /forgetPassword (POST) ==>{email} ==>{newPassword,code}

/user /resetPassword/:token (GET)

/user /logout (PUT) ==>{token,_id}

Handle posts routers :
/post/addPost  -- /post/userPost --/post/allPost -- /post/updatePost
/post/updatePostStatus -- /post/deletePost -- /post//likePost  -- /post/disLikePost

Handle posts routers :

/post/addPost  (POST)===>{text,title,token)

/post/userPost  (GET)===>{token)

/post/allPost (GET)

/post/updatePost (PUT)===>{text,title,_id,token)

/post /updatePostStatus (PUT)===>{privacy,_id,token)

/post/deletePost (DELETE)===>{_id,token)

/post /likePost (POST)===>{postId,token)

/post /disLikePost   (POST)===>{postId,token)

Handle posts routers :

/comment/addComment (POST)===>{postId,comment,token)

/comment/updateComment   (PUT)===>{_id,editComment,token)

/comment/deleteComment    (DELETE)===>{_id,token)

/comment/getComment   (GET)===>{postId,token)

