#!/usr/bin/env bashio

export __BASHIO_LOG_LEVEL=5

bashio::log.info "Node version: $(node --version)"
bashio::log.info "npm version: $(npm --version)"
bashio::log.info "Current Add-on version is $(bashio::addon.version)"

find_addon_full_slug() {
    local short_slug=$1
    local installed full_slug line

    bashio::log.info "Finding full slug for short slug: ${short_slug}"

    installed="$(bashio::addons)" || return 1
    # bashio::log.info "Installed addons raw: $(printf '%s' "$installed")"

    while IFS= read -r line; do
        # bashio::log.info "Checking addon entry: $line"

        if [[ "$line" == *"_${short_slug}" ]]; then
            full_slug="$line"
            break
        fi
    done <<< "$installed"

    if bashio::var.is_empty "${full_slug}"; then
        bashio::log.warning "No full slug found for ${short_slug}"
        return 1
    fi

    bashio::log.info "Found match: ${full_slug}"
    echo "$full_slug"
}

if bashio::config.true 'enable_conflict_detection'; then
    bashio::log.info "Conflict detection enabled"

    TARGET_SHORT_SLUG="ewelink_smart_home_for_homeassistant_slug"

    FULL_SLUG="$(find_addon_full_slug "${TARGET_SHORT_SLUG}")" || {
        bashio::log.warning "Target addon not found, skip conflict detection"
        FULL_SLUG=""
    }

    if ! bashio::var.is_empty "${FULL_SLUG}"; then
        STATE="$(bashio::addon.state "${FULL_SLUG}" 2>/dev/null || echo "unknown")"
        bashio::log.info "Addon ${FULL_SLUG} state: ${STATE}"

        if [ "${STATE}" = "started" ]; then
            bashio::log.fatal "Conflict detected: ${FULL_SLUG} is running. Aborting startup."
            exit 1
        fi
    fi
else
    bashio::log.info "Conflict detection not enabled"
fi

bashio::log.info "Starting application..."

exec "$@"