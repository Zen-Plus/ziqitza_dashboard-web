import { useState } from 'react';

const useService = ({
  method,
  context,
  initialValuesMethod = null,
  initialValues = false,
}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialValues);
    const [error, setError] = useState(false);
  
    const request = async (query) => {
      setLoading(true);
      try {
        const response = await method(query, context);
        const { body } = response;
        if (initialValuesMethod) {
          let { body: { data: _data } } = response;
          _data = initialValuesMethod(_data);
          setData(_data);
        } else {
          setData(body);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
  
    return {
      request,
      loading,
      data,
      error,
    };
  };

  export default useService;