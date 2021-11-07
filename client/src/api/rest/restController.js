import http from '../interceptor';

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.post('getUser');

export const setNewOffer = data => http.post('setNewOffer', data);
export const setOfferStatus = data => http.post('setOfferStatus', data);
export const downloadContestFile = data =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = data => http.post('pay', data.formData);
export const changeMark = data => http.post('changeMark', data);
export const getPreviewChat = () => http.post('getPreview');
export const getDialog = data => http.post('getChat', data);

export const cashOut = data => http.post('cashout', data);
export const updateUser = data => http.post('updateUser', data);
export const newMessage = data => http.post('newMessage', data);
export const changeChatFavorite = data => http.post('favorite', data);
export const changeChatBlock = data => http.post('blackList', data);
export const getCatalogList = data => http.post('getCatalogs', data);
export const addChatToCatalog = data => http.post('addNewChatToCatalog', data);
export const createCatalog = data => http.post('createCatalog', data);
export const deleteCatalog = data => http.post('deleteCatalog', data);
export const removeChatFromCatalog = data =>
  http.post('removeChatFromCatalog', data);
export const changeCatalogName = data => http.post('updateNameCatalog', data);
// Contests
export const dataForContest = data =>
  http.post('/contests/dataForContest', data);

// export const updateContest = data => http.patch(`/contests/${data???id}`, data);
export const updateContest = data => http.post('/contests/updateContest', data);

// npm:query-string
export const getCustomersContests = data =>
  http.get(
    `/contests?limit=${data.limit}&offset=${data.offset}&status=${data.contestStatus}`
  );

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.post('/contests/getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

// Параметры строки запроса:
// `/contests?limit=${data.limit}` => '/contests'        => req.query.limit

// Параметры маршрута:
// `/contests/${data.limit}`       => '/contests/:limit' => req.params.limit

// Отрефакторить (использовать params - параметры маршрута)
export const getContestById = ({ contestId }) =>
  http.get(`/contests/${contestId}`);
