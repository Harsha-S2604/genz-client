//This reducer is for Blog Writing.

const writeConfigInitState = {
    createBlogArr : [],
    previousId: 0,
    title: "",
    description: "",
    editorContent: "",
    isBlogPublishLoader: false
}

const resetWriteConfigInitState = {
    createBlogArr: [],
    previousId: 0,
    title: "",
    description: "",
    editorContent: "",
    isBlogPublishLoader: false
}

const getWriteOptionObjById = (id, createBlogArr) => {
    for(let i = 0 ; i < createBlogArr.length; i++) {
        if(id === createBlogArr[i].id) {
            return i
        }
    }
    return -1;
}

const writeConfig = (state = writeConfigInitState, action) => {

    switch(action.type) {

        case "WRITE_CONFIG":
            let createBlogArr = [...state.createBlogArr]
            let previousId = state.previousId + 1
            let writeOptionObj = {id: "", name: "", fileName: "", data: ""}
            writeOptionObj.id = previousId
            previousId = writeOptionObj.id;
            writeOptionObj.name = action.data.writeOption
            createBlogArr.push(writeOptionObj);

            return {
                ...state,
                createBlogArr: createBlogArr,
                previousId: previousId
            }

        case "DELETE_BLOG_OPION":
            return {
                ...state,
                createBlogArr: [
                    ...state.createBlogArr.slice(0, action.data.index),
                    ...state.createBlogArr.slice(action.data.index + 1)
                ],
            }

        case "RESET_BLOG_OPIONS":
            state = resetWriteConfigInitState;

            return {
                ...state
            }
        
        case "UPDATE_FILE_NAME":
            let objToUpdateFileNameIndex = getWriteOptionObjById(action.data.id, state.createBlogArr);
            let createBlogArrToUpdateFileName = [...state.createBlogArr];
            if(objToUpdateFileNameIndex === -1) {
                console.log("Sorry something went wrong, Please try again later.");
            } else {
                let objToUpdateFileName = createBlogArrToUpdateFileName[objToUpdateFileNameIndex];
                objToUpdateFileName.fileName = action.data.fileName;
                createBlogArrToUpdateFileName[objToUpdateFileNameIndex] = objToUpdateFileName;
            }

            return {
                ...state,
                createBlogArr: createBlogArrToUpdateFileName
            }
        
        case "UNSET_FILENAME":
            let objToUnsetFileNameIndex = getWriteOptionObjById(action.data.id, state.createBlogArr);
            let createBlogArrToUnsetFileName = [...state.createBlogArr];
            if(objToUnsetFileNameIndex === -1) {
                console.log("Sorry something went wrong, Please try again later.");
            } else {
                let objToUnsetFileName = createBlogArrToUnsetFileName[objToUnsetFileNameIndex];
                objToUnsetFileName.fileName = "";
                createBlogArrToUnsetFileName[objToUnsetFileNameIndex] = objToUnsetFileName;
            }
            return {
                ...state,
                createBlogArr: createBlogArrToUnsetFileName
            }
        

        case "SET_BLOG_DATA":
            let objToSetDataIndex = getWriteOptionObjById(action.data.id, state.createBlogArr);
            let createBlogArrToSetData = [...state.createBlogArr];
            if(objToSetDataIndex === -1) {
                console.log("Sorry something went wrong, Please try again later.")
            } else {
                let objToSetData = createBlogArrToSetData[objToSetDataIndex];
                objToSetData.data = action.data.data;
                createBlogArrToSetData[objToSetDataIndex] = objToSetData;   
            }

            return {
                ...state,
                createBlogArr: createBlogArrToSetData
            }

        case "UNSET_BLOG_DATA":
            let objToUnsetDataIndex = getWriteOptionObjById(action.data.id, state.createBlogArr);
            let createBlogArrToUnsetData = [...state.createBlogArr];

            if(objToUnsetDataIndex === -1) {
                console.log("Sorry something went wrong, Please try again later.");
            } else {
                let objToUnsetData = createBlogArrToUnsetData[objToUnsetDataIndex];
                objToUnsetData.data = "";
                createBlogArrToUnsetData[objToUnsetDataIndex] = objToUnsetData;
            }

            return {
                ...state,
                createBlogArr: createBlogArrToUnsetData
            }
        
        case "SET_BLOG_TITLE":
            return {
                ...state,
                title: action.data.title
            }
        
        case "SET_BLOG_DESCRIPTION":
            return {
                ...state,
                description: action.data.description
            }

        case "SET_BLOG_EDITOR_STATE":
            return {
                ...state,
                editorContent: action.data.editorState
            }
        
        case "BLOG_PUBLISH_LOADER":
            return {
                ...state,
                isBlogPublishLoader: action.data.isBlogPublishLoader
            }

        default:
            break;

    }

    return state;

} 

export default writeConfig;