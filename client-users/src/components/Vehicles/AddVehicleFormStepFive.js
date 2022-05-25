import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { useDropzone } from "react-dropzone";

import { CLEAR_ERROR, SET_ERROR } from "../../actions/types/errorTypes";

const AddVehicleFormStepFive = (props) => {
  const { vehicleState, setVehicleState } = props;
  const intl = useIntl();
  const { photos } = vehicleState;
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    dispatch({ type: CLEAR_ERROR });

    if (rejectedFiles && rejectedFiles.length > 0) {
      dispatch({
        type: SET_ERROR,
        payload: {
          type: "file",
          message: intl.formatMessage({ id: "INPUT_FILE_LARGE_ERROR" }),
        },
      });
    }

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setVehicleState((prevState) => ({
          ...prevState,
          photos: [...prevState.photos, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const [removed, setRemoved] = useState("");

  const removePhoto = (photo) => {
    setRemoved(photo);
    setTimeout(() => {
      setVehicleState({
        ...vehicleState,
        photos: photos.filter((p) => p !== photo),
      });
      setRemoved("");
    }, 900);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div
          className={classNames("dropzone", {
            "dropzone-active": isDragActive,
          })}
          {...getRootProps()}
        >
          <input className='d-none' {...getInputProps} />
          {isDragActive
            ? intl.formatMessage({ id: "INPUT_FILE_DROP" })
            : intl.formatMessage({ id: "INPUT_FILE_DRAG" })}
        </div>
      </div>
      <div className='card-divider' />
      {photos.length > 0 && (
        <div className='preview row'>
          {photos.map((photo, index) => (
            <div key={index} className='col-lg-3 col-sm-12  mt-2'>
              <img
                onClick={() => removePhoto(photo)}
                className={classNames("selected-images", {
                  "removed-image": removed === photo,
                })}
                src={photo}
                alt='preview'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddVehicleFormStepFive;
