export const paginate = (data, currentPage, pageSize) => {
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}