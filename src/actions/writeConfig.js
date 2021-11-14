export const addForOptionWriteBlog = (option) => {

    return (dispatch) => {
        dispatch({type: "WRITE_CONFIG", data: {writeOption: option}})
    }

}

export const resetOptionWriteBlog = () => {

    return (dispatch) => {
        dispatch({type: "RESET_BLOG_OPIONS"})
    }

}

export const deleteBlogOption = (index) => {
    
    return (dispatch) => {
        dispatch({type: "DELETE_BLOG_OPION", data:{index}})
    }

}

export const updateFileName = (id, fileName) => {

    return (dispatch) => {
        dispatch({type: "UPDATE_FILE_NAME", data: {id, fileName}})
    }
}

export const unsetFileName = (id) => {

    return (dispatch) => {
        dispatch({type: "UNSET_FILENAME", data: {id}})
    }
    
}

export const setBlogData = (id, data) => {

    return (dispatch) => {
        dispatch({type: "SET_BLOG_DATA", data: {id, data}})
    }

}

export const unsetBlogData = (id) => {

    return (dispatch) => {
        dispatch({type: "UNSET_BLOG_DATA", data: {id}})
    }

}

export const setBlogTitle = (title) => {
    return (dispatch) => {
        dispatch({type: "SET_BLOG_TITLE", data:{title}})
    }
}

export const setBlogDescription = (description) => {
    return (dispatch) => {
        dispatch({type: "SET_BLOG_DESCRIPTION", data: {description}})
    }
}

export const setBlogImage = (file) => {
    return (dispatch) => {
        dispatch({type: "SET_BLOG_IMAGE", data: file})
    }
}

export const setBlogEditorState = (editorState) => {
    return (dispatch) => {
        dispatch({type:"SET_BLOG_EDITOR_STATE", data:{editorState}})
    }
}

export const blogPublishLoader = (isBlogPublishLoader) => {
    return (dispatch) => {
        dispatch({type: "BLOG_PUBLISH_LOADER", data: {isBlogPublishLoader}})
    }
}