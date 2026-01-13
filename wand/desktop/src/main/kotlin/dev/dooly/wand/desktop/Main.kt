package dev.dooly.wand.desktop

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import dev.dooly.wand.shared.App

fun main() = application {
    Window(onCloseRequest = ::exitApplication) {
        App()
    }
}
