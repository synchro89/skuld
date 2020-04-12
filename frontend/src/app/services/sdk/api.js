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
        RATED: "rated",
        ALL: "all"
    },
    paginate: function (userConfig) {
        const status_types = this.status_types;

        const defaultConfig = {
            filters: {},
            fields: [],
            order: {
                createdAt: "desc"
            },
            status: status_types.ALL,
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
                    case status_types.TRENDING:
                        this.filters = {};
                        this.order = {};
                        this.fields = {};
                        break;
                }
            }
        }

        const config = Object.assign({}, defaultConfig, userConfig);
        config._normalize();

        const params = new URLSearchParams("");

        // Add filters to URL params
        Object.keys(config.filters).forEach(key => {
            const filterColumn = `filter[${key}]`;

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
        if (fieldsString.length) params.set(`fields[anime]`, fieldsString);

        const initialState = {
            data: [],
            loading: true,
            error: null,
            hasMore: null,
            page: 1,
            limit: 5,
        }

        if (config.status === status_types.TRENDING) {
            const trendingPagination = {
                ...config,
                ...initialState,
                baseURL: "https://kitsu.io/api/edge/trending/anime",
                _update_limit: function () {
                    params.set("limit", this.limit);
                },
                _get: async function () {
                    this._update_limit();

                    this.loading = true;

                    try {
                        const response = await api_core.get(`/?${params.toString()}`, {
                            baseURL: this.baseURL
                        });

                        const { data } = response;

                        this.data = [...this.data, ...data];

                        this.hasMore = data.length < 20;

                        return this.data;
                    } catch (error) {
                        this.error = error;
                        throw error;
                    } finally {
                        this.loading = false;
                    }
                },
                getAll: async function () {
                    this.limit = 20;
                    return await this._get();
                },
                getOnly: async function (limit) {
                    this.limit = limit;
                    return await this._get();
                }
            }
            return trendingPagination;
        }


        const pagination = {
            ...config,
            ...initialState,
            request: null,
            _setRequest: function (newParams) {
                this.request = api_core.baseURL + "/?" + newParams.toString();
            },
            _initPage: function () {
                params.set(`page[limit]`, this.limit);
                params.set(`page[offset]`, calcSkip(1, this.limit));
                this._setRequest(params);
            },
            _nextPage: function () {
                this.page++;
                params.set(`page[limit]`, this.limit);
                params.set(`page[offset]`, calcSkip(1, this.limit));
                this._setRequest(params);
            },
            _prevPage: function () {
                this.page--;
                params.set(`page[limit]`, this.limit);
                params.set(`page[offset]`, calcSkip(1, this.limit));
                this._setRequest(params);
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
                    this.data = [...this.data, ...data];

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

                    this.hasMore = count > this.data.length;

                    return data;
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
