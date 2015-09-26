#include "pebble.h"
/*
 *
 * https://github.com/pebble-examples/pebblekit-js-weather/blob/master/src/weather.c
 *
 */
static Window *s_main_window;

// example static globals
static Textlayer *s_temperature_layer;
static TextLayer *s_city_layer;

static AppSync s_sync;
static uint8_t sync_buffer[64];


// example error callback
static void sync_error_callback(DictionaryResult dict_error, AppMessageResult app_message_error, void *context) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "App Message Sync Error: %d", app_message_error);
}


