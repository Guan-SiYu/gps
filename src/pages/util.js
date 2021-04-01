import moment from 'moment';

export const staticColumns = [
  {
    title: 'Packet Time',
    fixed: 'left',
    render: (_, { package_time }) => moment(package_time).format(),
  },
  {
    title: 'GPS Time',
    render: (_, { timestamp }) => moment(timestamp).format(),
  },
  {
    title: 'Location',
    render: (_, { lat, lon, alt }) => `${lon}，${lat}，${alt}`,
  },
  {
    title: 'Satellites',
    render: (_, { satellites }) =>
      satellites.replace(/(?<=:)\d+/g, (str) => `(${str})`),
  },
  {
    title: 'SNR Avg',
    dataIndex: 'avg',
  },
  {
    title: 'SNR Desc',
    dataIndex: 'desc',
  },
  {
    title: 'Misc',
    render(_, { misc }) {
      const obj = JSON.parse(misc);
      let str = '';
      for (let key in obj) str += `${key}:${obj[key]},`;
      return str.slice(0, -1);
    },
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
