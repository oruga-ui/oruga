import { getOptions, setOptions } from '@utils/config'

describe('Config', () => {
    describe('Test options', () => {
        test('defaultToastDuration option should be 1000', () => {
            const config = getOptions()
            setOptions(Object.assign(config, {defaultToastDuration: 1000}))
            expect(config.defaultToastDuration).toBe(1000)
        })
    })
})
