import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';

function SubmitButton({ icon, title, color, widthColor }) {
    const { handleSubmit } = useFormikContext();

    return (
        <AppButton onPress={handleSubmit} icon={icon} title={title} color={color} widthColor={widthColor}/>
    );
}

export default SubmitButton;