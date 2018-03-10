const paginate = require('express-paginate');

const createRelLinks = (pages, currentPage) => {
  return pages
    .filter(
      x =>
        x.number === currentPage + 1 ||
        x.number === currentPage - 1 ||
        x.number === currentPage
    )
    .map(x => {
      x.rel =
        x.number === currentPage
          ? 'current'
          : x.number > currentPage ? 'next' : 'prev';
      return x;
    })
    .map(x => `<${x.url}>;` + ` rel=\'${x.rel}\'`);
};

const setPaginationHeaders = (req, res, count) => {
  const pageCount = Math.ceil(count / req.query.limit);
  res.set('X-Total-Count', count);
  res.set('X-Has-More-Pages', paginate.hasNextPages(req)(pageCount));
  res.set(
    'Link',
    createRelLinks(
      paginate.getArrayPages(req)(3, pageCount, req.query.page),
      req.query.page
    )
  );
};

module.exports = {
  setPaginationHeaders
};
