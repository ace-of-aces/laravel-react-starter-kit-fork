import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { edit } from '@/routes/password';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: edit().url,
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <Form
                        {...PasswordController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={[
                            'password',
                            'password_confirmation',
                            'current_password',
                        ]}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.password) {
                                passwordInput.current?.focus();
                            }

                            if (errors.current_password) {
                                currentPasswordInput.current?.focus();
                            }
                        }}
                        className="space-y-6"
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                            <>
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>
                                            Change your account password
                                        </FieldLegend>
                                        <FieldDescription>
                                            Ensure your account is using a long,
                                            random password to stay secure
                                        </FieldDescription>
                                    </FieldSet>

                                    <Field>
                                        <FieldLabel htmlFor="current_password">
                                            Current password
                                        </FieldLabel>
                                        <Input
                                            id="current_password"
                                            ref={currentPasswordInput}
                                            name="current_password"
                                            type="password"
                                            className="block w-full"
                                            autoComplete="current-password"
                                            placeholder="Current password"
                                        />
                                        <FieldError>
                                            {errors.current_password}
                                        </FieldError>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            New password
                                        </FieldLabel>
                                        <Input
                                            id="password"
                                            ref={passwordInput}
                                            name="password"
                                            type="password"
                                            className="block w-full"
                                            autoComplete="new-password"
                                            placeholder="New password"
                                        />
                                        <FieldError>
                                            {errors.password}
                                        </FieldError>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="password_confirmation">
                                            Confirm password
                                        </FieldLabel>
                                        <Input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            className="block w-full"
                                            autoComplete="new-password"
                                            placeholder="Confirm password"
                                        />
                                        <FieldError>
                                            {errors.password_confirmation}
                                        </FieldError>
                                    </Field>

                                    <Field
                                        orientation="horizontal"
                                        className="mt-2 flex items-center"
                                    >
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            data-test="update-password-button"
                                        >
                                            Save password
                                        </Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="ml-4 text-sm text-neutral-600">
                                                Saved
                                            </p>
                                        </Transition>
                                    </Field>
                                </FieldGroup>
                            </>
                        )}
                    </Form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
