(function ($) {
    "use strict";

    var state = {
        resources: Array.isArray(window.resourceCenterData) ? window.resourceCenterData : [],
        searchText: "",
        category: "all"
    };

    var selectors = {
        search: "#js-resource-search",
        category: "#js-resource-category",
        clear: "#js-resource-clear",
        grid: "#js-resource-grid",
        empty: "#js-resource-empty",
        total: "#js-total-count",
        modal: "#js-resource-modal",
        modalTitle: "#js-modal-title",
        modalSummary: "#js-modal-summary",
        modalLink: "#js-modal-link"
    };
    var focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    var lastFocusedElement = null;

    function readFiltersFromQuery() {
        var params = new URLSearchParams(window.location.search);
        var search = params.get("search");
        var category = params.get("category");
        var categoryExists = $(selectors.category).find('option[value="' + (category || "") + '"]').length > 0;

        state.searchText = search || "";
        state.category = categoryExists ? category : "all";
    }

    function syncQueryWithState() {
        var params = new URLSearchParams(window.location.search);
        var search = normalize(state.searchText);
        var category = state.category || "all";

        if (search) {
            params.set("search", state.searchText.toString().trim());
        } else {
            params.delete("search");
        }

        if (category && category !== "all") {
            params.set("category", category);
        } else {
            params.delete("category");
        }

        var query = params.toString();
        var nextUrl = query ? (window.location.pathname + "?" + query) : window.location.pathname;
        window.history.replaceState({}, "", nextUrl);
    }

    function normalize(value) {
        return (value || "").toString().trim().toLowerCase();
    }

    function escapeHtml(text) {
        return (text == null ? "" : String(text))
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function filteredResources() {
        var text = normalize(state.searchText);
        var category = normalize(state.category);

        // TODO CANDIDATO 1:
        // Completar filtro por texto en titulo/resumen y mantener filtro por categoria.
        return state.resources.filter(function (item) {
            var itemCategory = normalize(item.category);
            var title = normalize(item.title);
            var summary = normalize(item.summary);

            if (category !== "all" && itemCategory !== category) {
                return false;
            }

            if (!text) {
                return true;
            }

            return title.indexOf(text) !== -1 || summary.indexOf(text) !== -1;
        });
    }

    function cardHtml(item) {
        var title = escapeHtml(item.title || "Sin titulo");
        var summary = escapeHtml(item.summary || "Sin resumen");
        var category = escapeHtml(item.category || "Sin categoria");
        var id = escapeHtml(item.id || "");

        return [
            '<article class="tt-card" data-id="', id, '">',
            '<p class="tt-card__category">', category, '</p>',
            '<h3 class="tt-card__title">', title, '</h3>',
            '<p class="tt-card__summary">', summary, '</p>',
            '<button type="button" class="tt-card__open js-open-resource" data-id="', id, '" aria-label="Ver detalle de ', title, '">Ver detalle</button>',
            '</article>'
        ].join("");
    }

    function render() {
        var data = filteredResources();
        var html = data.map(cardHtml).join("");

        $(selectors.grid).html(html);
        $(selectors.total).text(data.length);
        $(selectors.empty).prop("hidden", data.length > 0);
    }

    function openModalById(id) {
        var found = state.resources.find(function (item) {
            return String(item.id) === String(id);
        });

        if (!found) {
            return;
        }

        $(selectors.modalTitle).text(found.title || "Sin titulo");
        $(selectors.modalSummary).text(found.summary || "Sin resumen");
        $(selectors.modalLink).attr("href", found.url || "#");

        lastFocusedElement = document.activeElement;
        $(selectors.modal).prop("hidden", false).attr("aria-hidden", "false");

        var $focusable = $(selectors.modal).find(focusableSelector).filter(":visible");
        if ($focusable.length > 0) {
            $focusable.first().trigger("focus");
        }
    }

    function closeModal() {
        $(selectors.modal).prop("hidden", true).attr("aria-hidden", "true");

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    function wireEvents() {
        $(selectors.search).on("input", function () {
            state.searchText = $(this).val();
            syncQueryWithState();
            render();
        });

        $(selectors.category).on("change", function () {
            state.category = $(this).val();
            syncQueryWithState();
            render();
        });

        // TODO CANDIDATO 2:
        // Implementar boton limpiar para resetear filtros y volver a pintar.
        $(selectors.clear).on("click", function () {
            state.searchText = "";
            state.category = "all";

            $(selectors.search).val("");
            $(selectors.category).val("all");

            syncQueryWithState();
            render();
        });

        $(document).on("click", ".js-open-resource", function () {
            openModalById($(this).data("id"));
        });

        $(document).on("click", ".js-close-modal", closeModal);

        // TODO CANDIDATO 3:
        // Cerrar modal con tecla Escape.
        $(document).on("keydown", function (event) {
            if (event.key === "Escape" && $(selectors.modal).attr("aria-hidden") === "false") {
                closeModal();
                return;
            }

            if (event.key !== "Tab" || $(selectors.modal).attr("aria-hidden") !== "false") {
                return;
            }

            var $focusable = $(selectors.modal).find(focusableSelector).filter(":visible");
            if ($focusable.length === 0) {
                return;
            }

            var first = $focusable.get(0);
            var last = $focusable.get($focusable.length - 1);
            var active = document.activeElement;

            if (event.shiftKey && active === first) {
                event.preventDefault();
                $(last).trigger("focus");
                return;
            }

            if (!event.shiftKey && active === last) {
                event.preventDefault();
                $(first).trigger("focus");
            }
        });
    }

    function init() {
        readFiltersFromQuery();
        $(selectors.search).val(state.searchText);
        $(selectors.category).val(state.category);
        wireEvents();
        render();
    }

    init();
})(jQuery);
