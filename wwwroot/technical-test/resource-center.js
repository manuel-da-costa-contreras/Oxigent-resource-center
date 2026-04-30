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

    function normalize(value) {
        return (value || "").toString().trim().toLowerCase();
    }

    function escapeHtml(text) {
        return (text || "")
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
            if (category !== "all" && normalize(item.category) === category) {
                return false;
            }

            // Falta filtro por texto (intencionado)
            return true;
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
            '<button type="button" class="tt-card__open js-open-resource" data-id="', id, '">Ver detalle</button>',
            '</article>'
        ].join("");
    }

    function render() {
        var data = filteredResources();
        var html = data.map(cardHtml).join("");

        $(selectors.grid).html(html);
        $(selectors.total).text(state.resources.length);
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

        $(selectors.modal).prop("hidden", false).attr("aria-hidden", "false");
    }

    function closeModal() {
        $(selectors.modal).prop("hidden", true).attr("aria-hidden", "true");
    }

    function wireEvents() {
        $(selectors.search).on("input", function () {
            state.searchText = $(this).val();
            render();
        });

        $(selectors.category).on("change", function () {
            state.category = $(this).val();
            render();
        });

        // TODO CANDIDATO 2:
        // Implementar boton limpiar para resetear filtros y volver a pintar.
        $(selectors.clear).on("click", function () {
            // Intencionadamente incompleto
        });

        $(document).on("click", ".js-open-resource", function () {
            openModalById($(this).data("id"));
        });

        $(document).on("click", ".js-close-modal", closeModal);

        // TODO CANDIDATO 3:
        // Cerrar modal con tecla Escape.
    }

    function init() {
        wireEvents();
        render();
    }

    init();
})(jQuery);