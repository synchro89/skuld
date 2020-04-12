import api_core from "../core/api";

import { calcSkip } from "../../../scripts/utils";

const AnimesApi = {
    get: async function (animeId) {
        try {
            const response = await api_core.get(`/${animeId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    index: async function (config) {

    },
    status_types: {
        CURRENT: "current",
        ALL: "all",
        TRENDING: "trending",
        POPULAR: "popular",
        UPCOMING: "upcoming",
        RATED: "rated"
    },
    paginate: function (userConfig) {
        function normalizeColumn(column) {
            return column
                .replace(/\[/g, "%5B")
                .replace(/\]/g, "%5D")
        }

        const status_types = this.status_types;

        const defaultConfig = {
            filters: {},
            fields: [],
            order: {
                createdAt: "desc"
            },
            status: "all",
            status_types,
            _normalize: function () {
                switch (status) {
                    case status_types.CURRENT:
                        this.filters = Object.assign(this.filters, {
                            status: "current"
                        });
                        this.order = Object.assign(this.order, {
                            user_count: "desc"
                        });
                        break;
                    case status_types.POPULAR:
                        this.order = Object.assign(this.order, {
                            user_count: "desc"
                        });
                        break;
                    case status_types.RATED:
                        this.order = Object.assign(this.order, {
                            average_rating: "desc"
                        });
                        break;
                    case status_types.UPCOMING:
                        this.filters = Object.assign(this.filters, {
                            status: "upcoming",
                        });
                        this.order = Object.assign(this.order, {
                            user_count: "desc"
                        });
                        break;
                }
            }
        }

        const config = Object.assign({}, defaultConfig, userConfig);
        config._normalize();

        const params = new URLSearchParams("");

        // Add filters to URL params
        Object.keys(config.filters).forEach(key => {
            const filterColumn = normalizeColumn(`filter[${key}]`);

            const filterValue = config.filters[key];

            params.set(filterColumn, filterValue);
        });

        // Add sort to URL params
        const sortString = Object.keys(config.order).map(key =>
            `${config.order[key] === "desc" ? "-" : "+"}${key}`
        ).join(",");
        if (sortString.length) params.set("sort", sortString);

        // Add sparse fields
        const fieldsString = config.fields.join(",");
        if (fieldsString.length) params.set(normalizeColumn(`fields[anime]`), fieldsString);


        const initialState = {
            data: null,
            loading: true,
            error: null,
            hasMore: null,
            page: 1,
            limit: 10,
        }
        const pagination = {
            ...config,
            ...initialState,
            _initPage: function () {
                params.set(normalizeColumn(`page[limit]`), this.limit);
                params.set(normalizeColumn(`page[offset]`), calcSkip(1, this.limit));
            },
            _nextPage: function () {
                this.page++;
                params.set(normalizeColumn(`page[limit]`), this.limit);
                params.set(normalizeColumn(`page[offset]`), calcSkip(1, this.limit));
            },
            _prevPage: function () {

                this.page--;
                params.set(normalizeColumn(`page[limit]`), this.limit);
                params.set(normalizeColumn(`page[offset]`), calcSkip(1, this.limit));
            },
            initialData: async function () {
                this._initPage();
                this.loading = true;
                try {
                    const response = await api_core.get(`/?${params.toString()}`);

                    const { data, meta: { count } } = response;

                    this.data = data;

                    this.hasMore = count > this.data.length;

                    return this.data;
                } catch (error) {
                    this.error = error;
                    throw error;
                } finally {
                    this.loading = false;
                }
            },
            nextData: async function () {
                if (!this.hasMore) return;

                this.loading = true;

                this._nextPage();

                try {
                    const response = await api_core.get(`/?${params.toString()}`);

                    const { data, meta: { count } } = await response.json();
                    this.data = data;

                    this.hasMore = count > this.data.length;

                    return this.data;
                } catch (error) {
                    this.error = error;
                    throw error;
                } finally {
                    this.loading = false;
                }
            },
            prevData: async function () {
                if (this.page === 1) return;

                this.loading = true;

                this._prevPage();

                try {
                    const response = await api_core.get(`/?${params.toString()}`);

                    const { data, meta: { count } } = await response.json();
                    this.data = data;

                    this.hasMore = count > this.data.length;

                    return this.data;
                } catch (error) {
                    this.error = error;
                    throw error;
                } finally {
                    this.loading = false;
                }
            }
        }

        return pagination;
    }
};



export {
    AnimesApi
};
