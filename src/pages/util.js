export const staticColumns = [
  {
    title: 'Packet Time',
    fixed: 'left',
    dataIndex: 'packet_time',
  },
  {
    title: 'GPS Time',
    dataIndex: 'gps_time',
  },
  {
    title: 'Lon',
    dataIndex: 'lon',
  },
  {
    title: 'Lat',
    dataIndex: 'lat',
  },
  {
    title: 'Alt',
    dataIndex: 'alt',
  },
  {
    title: 'SNR Avg',
    dataIndex: 'snr_avg',
  },
];
export const outputExcel = async (para) => {
  const { uri, payload, tipText } = para;
  try {
    const res = await axios.post(
      config.apiEndpoint + uri,
      JSON.stringify(payload),
      {
        responseType: 'arraybuffer',
      },
    );
    if (res.status == 200 && res.data) {
      const fileType =
        para.type || { type: res.headers['content-type'] } || null;
      const fileName =
        para.fileName ||
        res.headers['content-disposition'].match(/\"\w+\.\w+/)[0].slice(1);
      await download(res.data, fileName, fileType);
      message.success(tipText.success);
    }
  } catch (err) {
    console.log('download err=>', err);
    getResponseErrorMessage(err.response.data, tipText.error);
  }
};
