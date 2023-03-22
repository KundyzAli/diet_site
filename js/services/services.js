
const postData = async (url, data) => { //постинг данных на сервер, 
  // postData - занимается настройка запроса, фетчит, т.е.посылает на сервер, получает
  // ответ от сервера, и трансформирует этот ответ в json
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json();
};

async function getResource(url) { //получаем данные с сервера 
  let res = await fetch(url);
  // fetch если сталкивается с ошибкой он не выдаст catch, не выдаст reject, в таком случае нам нужно вручную настроить
  if (!res.ok) {
    // если res не ok  
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);//создаем и выкидываем ошибку
    //получим url по кот-му не смогли обратится, и статус кот-й там был                
  }

  return await res.json();
};

export { postData };
export { getResource };