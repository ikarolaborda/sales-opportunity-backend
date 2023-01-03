export default (app) => {
  app.post(
    `/tenant/:tenantId/sales-opportunities`,
    require('./salesOpportunitiesCreate').default,
  );
  app.put(
    `/tenant/:tenantId/sales-opportunities/:id`,
    require('./salesOpportunitiesUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/sales-opportunities/import`,
    require('./salesOpportunitiesImport').default,
  );
  app.delete(
    `/tenant/:tenantId/sales-opportunities`,
    require('./salesOpportunitiesDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/sales-opportunities/autocomplete`,
    require('./salesOpportunitiesAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/sales-opportunities`,
    require('./salesOpportunitiesList').default,
  );
  app.get(
    `/tenant/:tenantId/sales-opportunities/:id`,
    require('./salesOpportunitiesFind').default,
  );
};
