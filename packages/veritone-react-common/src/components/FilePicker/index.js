import React, { Component } from 'react';
import Modal from 'react-modal';
import FileUploader from './FileUploader';
import FileList from './FileList';
import FilePickerHeader from './FilePickerHeader/FilePickerHeader';
import FilePickerFooter from './FilePickerFooter/FilePickerFooter';
import UrlUploader from './UrlUploader';
import withMuiThemeProvider from 'helpers/withMuiThemeProvider';
import styles from './styles.scss';
import _ from 'lodash';

import {
    shape,
    string,
    arrayOf,
    oneOfType,
    number,
    bool
  } from 'prop-types';

@withMuiThemeProvider
class FilePicker extends Component {
    state = {
        isOpen: this.props.isOpen,
        selectedTab: "upload",
        files: []
    };

    componentWillReceiveProps = (nextProps) => {
        if (this.state.isOpen !== nextProps.isOpen) {
            this.setState({isOpen: nextProps.isOpen});
        }
    }

    handleRemoveFile = file => {
        let array = this.state.files;
        let fileIndex = _.findIndex(this.state.files, {
            'name': file.name,
            'size': file.size,
            'lastModified': file.lastModified,
            'type': file.type
        });
        array.splice(fileIndex, 1);
        this.setState({files: array});
    }

    handleFilesSelected = files => {
        this.setState({files: files});
    }

    handleTabChange = value => {
        this.setState({selectedTab: value});
    }

    handleUrlUpload = file => {
        this.setState({files: [file]});
    }

    handleCloseModal = () => {
        this.setState({isOpen:false});
    } 

    render () {
        let pickerOptions = this.props.options || {};
        let acceptedFileTypes = typeof pickerOptions.accept === 'string' ?
            [pickerOptions.accept] :
            pickerOptions.accept;
        return (
            <Modal isOpen={this.state.isOpen}
                   className={styles.modalContainer}>
                <div
                  className={styles.filePicker}
                  style={{
                    height: pickerOptions.height || 400,
                    width: pickerOptions.width || 600
                  }}
                >
                    <FilePickerHeader selectedTab={this.state.selectedTab}
                                      onSelectTab={this.handleTabChange}
                                      onCloseModal={this.handleCloseModal}/>
                    { 
                        this.state.selectedTab === "upload" && 
                            <div className={styles.filePickerBody}>
                                <FileUploader onFilesSelected={this.handleFilesSelected}
                                              acceptedFileTypes={acceptedFileTypes}/>
                                { 
                                    this.state.files.length > 1  &&
                                        <FileList files={this.state.files}
                                                    onRemoveFile={this.handleRemoveFile}/>
                                }
                            </div>
                    }
                    { 
                        this.state.selectedTab === "by-url" && 
                            <div className={styles.filePickerBody}>
                                <UrlUploader onUrlUpload={this.handleUrlUpload}
                                                accept={acceptedFileTypes}/>
                            </div> 
                    }
                    <FilePickerFooter onCloseModal={this.handleCloseModal}/> 
                </div>
            </Modal>
        );
    }
};

FilePicker.propTypes = {
    isOpen: bool,
    options: shape({
        width: number,
        height: number,
        accept: oneOfType([arrayOf(string), string])
    })
}

export default FilePicker;