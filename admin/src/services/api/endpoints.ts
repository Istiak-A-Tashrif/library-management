import { SERVER_URL } from '~/configs';
export const API_CRUD = 'crud';
export const API_CRUD_FIND_WHERE = 'crud/find-where';

export const getUrlForModel = (model: string, id: any = null) => {
  if (id) {
    return `crud/${id}?model=${model}`;
  }
  return `crud?model=${model}`;
};

export const API_CREATE_PRODUCT = '/admin-products/create-product';
export const API_CREATE_PRODUCTS_BY_CSV = '/admin-products/import-csv';
export const API_UPDATE_PRODUCT = '/admin-products/update-product';
export const API_GET_PRODUCT_DETAIL_FOR_EDIT = '/admin-products/product-detail';
export const API_CREATE_MULTIPLE_PRODUCT = '/admin-products/create-multiple-product';
export const API_GET_ALL_PRODUCT = '/admin-products/all';
export const API_GET_ALL_ORDER_LIST = '/admin-products/order-list';
export const API_GET_ALL_HOME_PAGE_LAYOUTS = '/home-layout';
export const API_UPDATE_HOME_LAYOUT_SORT_ORDER = 'admin/settings/sort-home-section';
export const API_UPDATE_SITE_MENU_ITEMS_SORT_ORDER = 'admin/settings/sort-menu-items';
export const API_GET_ORDER_COUNT = '/admin-dashboard/order-count';
export const API_GET_PRODUCT_COUNT = '/admin-dashboard/product-count';
export const API_GET_CUSTOMER_COUNT = '/admin-dashboard/user-count';
export const API_GET_SALES_COUNT = '/admin-dashboard/sales-count';
export const API_GET_LATEST_ORDER = '/admin-dashboard/latest-order';

export const API_FILE_UPLOAD = `${SERVER_URL}/api/v1/attachments/upload-image`;

export const API_CARE_HOME: any = 'care-homes/all?limit=:limit&page=:page';
export const DELETE_CARE_HOMES: any = 'care-homes/multi-delete';
export const MULTI_PUBLISH_CARE_HOMES: any = 'care-homes/multi-publish';
export const MULTI_VERIFIED_CARE_HOMES: any = 'care-homes/multi-verified';
export const API_EMAIL_TEMPLATE: string = 'email-template';
export const API_NOTIFICATION_TEMPLATE: string = 'notification-templates';

export const API_TICKET_TYPES = '/organizer/ticket-types';
export const API_TICKET_BUYERS = '/event-details/buyers';
export const API_TICKET_STATS = '/event-details/stats';
export const API_TICKET_SALES = '/event-details/total';
export const API_VOLUNTEER_STATS = '/event-details/volunteer-stats';
export const API_PHYSICAL_TICKET_STATS = "/event-details/physical-ticket-stats";
export const API_GET_TICKET_SCANNED_STATS = '/event-details/scanned-stats';
export const API_GET_EVENT_DETAILS = '/event-details/single';

export const API_PRE_REGISTER = 'pre-registrations';
export const API_CHECK_PRE_REGISTERED = 'pre-registrations/check';
export const API_GET_PRE_REGISTRATIONS = 'pre-registrations/user';
export const API_GET_PRE_REGISTRATIONS_FOR_EVENT = 'pre-registrations/event';

export const API_OVERALL_STATS = 'admin/stats';
export const API_RECENT_EVENTS = 'admin/stats/recent-events';
export const API_RECENT_ORDERS = 'admin/stats/recent-orders';
export const API_PENDING_APPROVALS = 'admin/stats/pending-approvals';
export const API_EVENT_STATS = 'admin/stats/event-stats';
export const API_REVENUE_STATS = 'admin/stats/revenue-stats';
export const API_SYSTEM_HEALTH = 'admin/stats/system-health';

export const API_INVOICE_DOWNLOAD = `${SERVER_URL}/api/v1/tickets/invoice/download`;
export const API_TICKET_DOWNLOAD = `${SERVER_URL}/api/v1/tickets/download`;

export const API_ORGANIZER_SUMMARY = 'admin/accounting/organizers-summary'
