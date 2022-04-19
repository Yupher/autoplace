import React, { useCallback, useEffect } from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";

const AddVehicleFormStepFive = (props) => {
  const { vehicleData, vehicleState, setVehicleState, onChange } = props;
  const { photos } = vehicleState;
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
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

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  return (
    <div className='container'>
      <div
        className={classNames("dropzone", { "dropzone-active": isDragActive })}
        {...getRootProps()}
      >
        <input className='d-none' {...getInputProps} />
        {isDragActive ? "Drag active" : "Drag and drop files"}
      </div>
      {photos.length > 0 && (
        <div className='preview'>
          {photos.map((photo, index) => (
            <img
              className='selected-images'
              src={photo}
              alt='preview'
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddVehicleFormStepFive;
