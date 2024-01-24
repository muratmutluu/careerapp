export const chartDataPie = (data) => {
  const chartData = {
    labels: data?.map((item) => item.department),
    datasets: [
      {
        label: '# of Votes',
        data: data?.map((item) => item.aday_sayisi),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
      },
    ],
  };
  return chartData;
};

export const options = (title) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
        },
      },
    },
  };
};

export const chartDataBar = (data) => {
  return {
    labels: data?.map((item) => item.ay),
    datasets: [
      {
        label: 'Aylara göre aday sayısı',
        data: data?.map((item) => item.aday_sayisi),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};

export const chartDataLine = (data) => {
    return {
      labels: data?.map((item) => item.position),
      datasets: [
        {
          label: 'Departmanlara göre aday sayısı',
          data: data?.map((item) => item.aday_sayisi),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',

        },
      ],
    };
  };