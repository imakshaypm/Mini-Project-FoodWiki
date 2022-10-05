import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({ rightIconPress ,rightIcon, name, width, elevation, ...otherProps }) {
    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={text => setFieldValue(name, text)}
                value={values[name]}
                width={width}
                elevation={elevation}
                rightIcon={rightIcon}
                rightIconPress={rightIconPress}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormField;