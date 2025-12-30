#include <node_api.h>
#include <stdbool.h>
#include <errno.h>
#include <sys/sysctl.h>

static bool is_running_under_rosetta(void) {
    int translated = 0;
    size_t size = sizeof(translated);

    // On Apple Silicon this key exists; on Intel or older macOS it may return ENOENT.
    if (sysctlbyname("sysctl.proc_translated", &translated, &size, NULL, 0) != 0) {
        // If the key doesn't exist, assume not running under Rosetta.
        // errno == ENOENT usually means "not applicable on this system".
        return false;
    }

    return translated == 1;
}

static napi_value IsRosetta(napi_env env, napi_callback_info info) {
    napi_value result;
    bool is_rosetta = is_running_under_rosetta();
    napi_get_boolean(env, is_rosetta, &result);
    return result;
}

static napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_create_function(env, NULL, 0, IsRosetta, NULL, &fn);
    napi_set_named_property(env, exports, "isRosetta", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
